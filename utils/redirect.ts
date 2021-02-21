import Router from 'next/router'
import { parseCookies } from 'nookies'

export const redirectUser = (ctx, location) => {
	if (ctx.req) {
		ctx.res.writeHead(302, {Location: location})
		ctx.res.end()
	} else {
		Router.push(location)
	}
}

export const redirectBasedOnAuthStatus = (ctx) => {
  const { token } = parseCookies(ctx)
  
  if(!token && ctx.pathname !== '/login') {
    redirectUser(ctx, '/login')
  }

  if(!!token && ctx.pathname === '/login') {
    redirectUser(ctx, '/')
  }
}
