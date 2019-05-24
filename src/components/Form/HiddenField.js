import { prop } from 'ramda'
import { mapPropsStream } from 'recompose'

const enhance = mapPropsStream(props$ => {
  props$
    .distinctUntilChanged(null, prop('val'))
    .subscribe(({ input, val }) => input.onChange(val))

  return props$
})

const HiddenField = () => null

export default enhance(HiddenField)
