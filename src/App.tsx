import { Box, Button, Grid, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { decrement, increment } from './features/counter/counterSlice'
import { RootState } from './store'

import './App.css'

function App() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className="App">
      <h1>Vite + React + Toolkit + MUI</h1>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={5}>
            <Button variant="contained" onClick={() => dispatch(increment())}>
              Increment
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Typography>{count}</Typography>
          </Grid>
          <Grid item xs={5}>
            <Button variant="contained" onClick={() => dispatch(decrement())}>
              Decrement
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default App
