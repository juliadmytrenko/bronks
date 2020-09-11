import React, { useState } from "react"

const HeaderDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  return (
    <div className="headerDropdown">
      <>NAME AVATAR</>
      {showDropdown && <>DROPDOWN</>}
    </div>
  )
}

export default HeaderDropdown
