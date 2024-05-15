//without a defined matcher, this one line applies nextauth
//to the entire project
export {default} from 'next-auth/middleware'

export const config ={
    matcher:[
        "/aboutus",
        "/Dashboard"
    ]
}