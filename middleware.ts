import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
const isProtectedRoute = createRouteMatcher(['/dashboard', '/grades','/emobuddy','/performancereport','/studentcommunity','/flashquest','/emotionalanalysis'])

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect()
})


export const config = {
    matcher: ['/((?!api|_next|static|favicon.ico).*)'],
  };

