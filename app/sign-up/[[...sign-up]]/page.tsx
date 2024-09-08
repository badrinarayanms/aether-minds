import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return  <div className='flex justify-center items-center pt-52'><SignUp afterSignOutUrl='/'  fallbackRedirectUrl='/dashboard'  /></div>

}