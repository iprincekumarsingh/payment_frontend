import React from 'react'
import TopBar from '../components/Topbar'
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
function Home() {
  return (
    <div className='bg-white  '>
      <TopBar></TopBar>
      <div
        className="justify-center items-center  text-center mx-auto border py-4  rounded-lg">
        <h1 className="text-2xl font-bold  text-black " id=''>₹ 70,000</h1>
        <h1 className='text-[16px] font-medium  text-gray-500'>Balance</h1>
      </div>

      <div className=' w-full h-24 mt-2 flex justify-between px-5 items-center '>
        <div className='flex text-center items-center justify-between w-full   '>
          <TransferCard
            icon={AddCardOutlinedIcon}
            title="Add Money"
            onClick={() => {
              alert('Hello')
            }}
          ></TransferCard>
          <TransferCard
            icon={AddCardOutlinedIcon}
            title="WithDrawal"
            onClick={() => {
              alert('Hello')
            }}
          ></TransferCard>
          <TransferCard
            icon={AddCardOutlinedIcon}
            title="Transfer"
            onClick={() => {
              alert('Hello')
            }}
          ></TransferCard>
        </div>
      </div>
      <div className='flex justify-center  w-auto items-center text-center mx-auto '>
        <div className='w-auto flex gap-3 py-1 bg-[#F5F7F8] items-center justify-center  px-9 rounded-3xl'>
          <h1>Wallet ID: 12346890</h1>
          <div><ContentCopyOutlinedIcon
            sx={{
              fontSize: 20,
              width: 20,
              height: 20,
            }}
          ></ContentCopyOutlinedIcon></div>
        </div>
        <div>
        </div>
      </div>
      <div className='px-2 mt-5'>
        <div className='flex px-2  px- justify-between items-center'>
          <div className='text-[16px] font-medium text-black'>
            Recent Transactions
          </div>
          <div className='flex-col o' >
            <h1>View All</h1>
            <div className='h-[0.1px]  border-[0.3px]  border-black '>

            </div>
          </div>
        </div>
        <div className='py5'>
          <div className='flex-col justify-between items-center '>
            <TransactionList></TransactionList>
            <TransactionList></TransactionList>
            <TransactionList></TransactionList>
            <TransactionList></TransactionList>
          </div>
        </div>
      </div>
    </div>
  )
}

const TransferCard = ({ icon, title, onClick }) => {
  return (
    <div className='flex-col justify-between items-center-300 w-28 min-w-28 max-w-28 
    overflow-x-auto ' >
      <div className='' onClick={onClick}>
        {React.createElement(icon, {
          sx: {
            fontSize: 40,
            borderRadius: '50%',
            borderWidth: '1px',
            borderColor: 'black',
            width: '40px',
            padding: '10px',
            color: 'white',
            backgroundColor: 'grey'
          }
        })}
      </div>
      <div>
        <h1 className='text-black'>{title}</h1>
      </div>
    </div>
  )
}

const TransactionList = () => {
  return (
    <div className='flex  justify-between items-center mt-2'>
      <div className='flex items-center gap-3'>
        <div className='bg-blue-300 w-10 h-10 rounded-full'>

          {/* add letter intials */}
          <div className='text-center text-black text-3xl font-medium'>
            P
          </div>

        </div>
        <div>
          <div className='text-black text-lg font-medium'>
            Amazon
          </div>
          <div className='text-black text-sm font-medium'>
            12/10/2021
          </div>
        </div>
      </div>
      <div className='text-black text-lg font-medium'>
        -₹ 1500
      </div>
    </div>
  )

}

export default Home