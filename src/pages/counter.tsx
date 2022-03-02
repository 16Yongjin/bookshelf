import { useAppDispatch, useAppSelector } from '../hooks/useStore'
import {
  decrement,
  increment,
  selectCount,
} from '../store/modules/counter/counterSlice'

function Counter() {
  const dispatch = useAppDispatch()
  const count = useAppSelector(selectCount)

  return (
    <div>
      <h1>Counter</h1>

      <div>count: {count}</div>

      <button onClick={() => dispatch(decrement())}>decrement</button>
      <button onClick={() => dispatch(increment())}>increment</button>
    </div>
  )
}

export default Counter
