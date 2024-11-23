const Finish = ({ requestId }) => {
  return (
    <div className='space-y-7 text-center'>
      <h2 className='font-extrabold text-[21px]  text-[#333639]'>Thank you!!!</h2>
      <div className='font-thin text-[#333639]'> Your request ID : <h2 className='text-xl text-[#3E6086] inline font-extrabold'> {requestId} </h2></div>
      {/* <div className='font-thin text-[#333639]'>Please expect an email from <b className='text-[#3E6086] font-semibold'> noreply@azuretech.tw </b> acknowledging your request submission by the next hour.</div> */}
      <div className='font-thin text-[#333639]'>If you didn't hear from us, please contact our customer support team.</div>
      <div className='font-thin text-[#333639]'>Estimated completion time is <b className='text-[#3E6086] font-semibold'> 5 working days</b> </div>
      <p></p>
    </div>
  )
}

export default Finish