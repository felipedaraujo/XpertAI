'use client'
import Link from 'next/link'
import styles from './home.module.scss'
import { HomeWorkList } from './components/lists/HomeWork'
import HomeWorkSection from './components/HomeWorkSection'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { useEffect } from 'react'
import useAuth from './hooks/useAuth'

function Home() {
  const { isLogged, error, isLoading } = useAuth()
  useEffect(() => {
    if (isLogged) {
      window.location.href = '/account'
    }
  }, [isLogged])

  return (
    <div className={styles.home__root}>
      <Nav />
      <div className={styles.home__main}>
        <div className={styles.home__main__left}>
          <h1 className={styles.home__left__heading}>
            Welcome to Xpert
            <span className={styles.home__left__heading__ai}>AI</span>
          </h1>
          <p className={styles.home__left__note}>
            Where AI Meets Human Expertise
            <br />
            for <b>Superior Military Contracts</b>
          </p>
          <div>
            <button className={styles.home__left__register}>
              <Link
                href="/register"
                style={{ textDecoration: 'none', color: 'white' }}
              >
                Try it for free
              </Link>
            </button>
            <button className={styles.home__left__login}>
              <Link
                href="/login"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                Log in
              </Link>
            </button>
          </div>
          {/* <p data-testid="policy" className={styles.home__left__policy}>
            By signing up, you agree to the{' '}
            <Link href="/">Terms and Conditions</Link> and{' '}
            <Link href="/">Privacy Policy</Link>. California residents, see our{' '}
            <Link href="/">CA Privacy Notice.</Link>
          </p> */}
        </div>
        {/* <div className={styles.home__main__right}>
          <video
            className={styles.home__main__right__video}
            autoPlay
            loop
            muted
          >
            <source
              data-testid="vid-start"
              src="https://static.grammarly.com/assets/files/8a0dda99e354dd8552833ffaf47992a7/llama_video.mp4"
              type="video/mp4"
            />
          </video>
          <img
            src="home-background.png"
            className={styles.home__main__right__image}
          />
        </div> */}
      </div>
      <div className={styles.home__work}>
        <h3 className={styles.home__work__heading}>Works Where You Do</h3>
        <p className={styles.home__work__info}>
          Get suggestions from XpertAI while you write military contracts in
          real-time, ensuring accuracy, compliance, and precision every step of
          the way.
        </p>
        <div className={styles.home__work__sections}>
          {HomeWorkList.map((section) => (
            <HomeWorkSection key={section.title} data={section} />
          ))}
        </div>
        <div className={styles.home__work__spelling}>
          <video
            className={styles.home__work__spelling__video}
            autoPlay
            loop
            muted
          >
            <source
              src="https://static.grammarly.com/assets/files/27770e0799f6c6b528204e72ed1fbad6/ggo_four_features_video.mp4"
              type="video/mp4"
            />
          </video>
          <div>
            <h3 style={{ fontWeight: 'bold' }}>Beyond Basic Analysis</h3>
            <p style={{ fontSize: '1.1rem', margin: '1rem 0rem' }}>
              From contract language to compliance and precision, XpertAI&apos;s
              expertise provides comprehensive insights, ensuring your military
              contracts are communicated effectively and accurately.
            </p>
          </div>
        </div>
        <div className={styles.home__work__end}>
          <h2 className={styles.home__work__heading}>
            Brilliant Contracting Awaits
          </h2>
          <p className={styles.home__work__info}>
            Discover the power of confident contracting with XpertAI Free.
          </p>
          <p className={styles.home__work__btn}>
            <Link
              href="/register"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Try it for free
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
