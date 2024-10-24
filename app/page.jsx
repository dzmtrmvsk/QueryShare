import Feed from "@components/Feed"
import Link from "next/link"

const Home = () => {
    return (
        <section className='w-full flex-center flex-col'>
            <h1 className="head_text text-center">
                Discover & Share AI Promts
            <br />
            <span className="orange_gradient text-center">
                AI-Powered Promts
            </span>
            </h1>
            <p className="desc text-center">
            QueryShare is an open-source AI promting tool for modern world to discover, create and share creative promts
            </p>
            <Link href={'/testtest'}>
            TESTTEST
            </Link>
            <br /><br /><br /><br /><br />
            <Feed />
        </section>
    )
}

export default Home