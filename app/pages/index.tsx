import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (

    <div>
      <Head>
        <title>Mercado Libre</title>
        <meta name="description" content="Buscador" />
      </Head>
    </div>
  )
}
