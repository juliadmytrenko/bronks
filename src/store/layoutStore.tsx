import { Subject } from "rxjs"

const subject = new Subject()

const layoutStore = {
  subscribe: setState => subject.subscribe(setState),
}
