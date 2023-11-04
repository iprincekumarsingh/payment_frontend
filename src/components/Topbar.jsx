import React from 'react'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
function Topbar() {
  return (
    <div className='px-6 py-10 w-full h-16 flex justify-between items-center '>
      <div>
        <h1 className='text-black text-xl font-medium'>Good Morning!</h1>
        <span className='text-black text-2xl font-bold'>Pumpkin</span>
      </div>
      <div>

        <AccountCircleOutlinedIcon
          sx={{
            fontSize: 20,
            width: 40,
            height: 60,
            color: '#0A79DF',
            // background: 'black',
            borderRadius: '50%',
          }}
        />
      </div>
    </div>
  )
}

export default Topbar