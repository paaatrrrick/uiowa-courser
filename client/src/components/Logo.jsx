import Image from 'next/image'
import logo from '@/images/logo192.png'


export function Logo(props) {
  return (
    <Image
    src={logo}
    className={props.className}
    width={50}
    height={50}
    alt="Picture of the author"
  />
  )
}
