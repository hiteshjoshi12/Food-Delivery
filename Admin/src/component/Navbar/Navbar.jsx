import {assets} from '../../assets/admin_assets/assets'
const Navbar = () => {
  return (
    <div className="flex justify-between  items-center py-2 px-[4%]">
        <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
        <img className='w-10' src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar