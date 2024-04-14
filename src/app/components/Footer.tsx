import { FC } from 'react'
import styles from './footer.module.scss'

const Footer: React.FC = () => {
  return (
    <div className={styles.footer__container}>
      <div className={styles.footer}>
        <ul>
          <h1 className={styles.footer__header}>Get XpertAI</h1>
          <li className={styles.footer__option}>XpertAI for Your Desktop</li>
          <li className={styles.footer__option}>XpertAI for Windows</li>
          <li className={styles.footer__option}>XpertAI for Mac</li>
          <li className={styles.footer__option}>XpertAI Browser Extension</li>
          <li className={styles.footer__option}>XpertAI for Chrome</li>
          <li className={styles.footer__option}>2023 © XpertAI Inc.</li>
        </ul>
        <ul>
          <h1 className={styles.footer__header}>Learn More</h1>
          <li className={styles.footer__option}>Plans</li>
          <li className={styles.footer__option}>XpertAI Premium</li>
          <li className={styles.footer__option}>XpertAI Business</li>
          <li className={styles.footer__option}>XpertAI for Education</li>
          <li className={styles.footer__option}>XpertAI GO</li>
        </ul>
        <ul>
          <h1 className={styles.footer__header}>Features</h1>
          <li className={styles.footer__option}>Contract Checker</li>
          <li className={styles.footer__option}>Requirements Checker</li>
          <li className={styles.footer__option}>Expert Generator</li>
          <li className={styles.footer__option}>Essay Checker</li>
          <li className={styles.footer__option}>Paraphrasing Tool</li>
        </ul>
        <ul>
          <h1 className={styles.footer__header}>Company</h1>
          <li className={styles.footer__option}>About</li>
          <li className={styles.footer__option}>Responsible AI</li>
          <li className={styles.footer__option}>Careers & Culture</li>
          <li className={styles.footer__option}>Press</li>
          <li className={styles.footer__option}>Affiliates</li>
          <li className={styles.footer__option}>Partners</li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
