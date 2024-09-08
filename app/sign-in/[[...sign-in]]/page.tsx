import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <div className='flex justify-center items-center pt-52'><SignIn afterSignOutUrl='/' fallbackRedirectUrl={'/dashboard'}/></div>
}