'use client'
import React, { useRef, useEffect, useState } from 'react'
import styles from './docs.module.scss'
import useDocument from '@/app/hooks/useDocument'
import Loading from '@/app/components/Loading'
import { HandleSaveDocument } from '@/app/helpers/SaveDocument'
import ContentEditable from 'react-contenteditable'
import TextCustomBar from './components/TextCustomBar'
import Link from 'next/link'
import SidebarDocument from './components/SidebarDocument'
import { AnimatePresence } from 'framer-motion'
import { HandleCheckText } from '@/app/helpers/CheckText'
import CorrectText from './components/CorrectText'
import CircularProgress from '@mui/material/CircularProgress'
import { HandleCheckWord } from '@/app/helpers/CheckSynonyms'
import SynonymsWords from './components/SynonymsWords'
import { DocumentContext } from './context/DocumentContext'
import { HandleTranslateText } from '@/app/helpers/TranslateText'
import TranslateText from './components/TranslateText'
import useAuth from '@/app/hooks/useAuth'
import Select from 'react-select'
import experts from './experts.json'

interface DocsProps {
  params: {
    id: string
    user_id: string
  }
}

const parsedExperts = experts
  .sort((a, b) => a.job.localeCompare(b.job))
  .map((expert) => ({
    id: expert.id,
    value: expert.id,
    label: expert.job,
    description: expert.instructions,
  }))

const Doc: React.FC<DocsProps> = ({ params }) => {
  const { isLogged } = useAuth()
  const { document, error, isLoading, setDocument } = useDocument(
    params.user_id,
    params.id
  )
  const [text, setText]: [
    undefined | string | Element,
    React.Dispatch<React.SetStateAction<undefined | string | Element>>
  ] = useState()
  const [selectedExperts, setSelectedExperts] = useState<
    {
      id: string
      value: string
      label: string
      description: string
    }[]
  >([parsedExperts[14], parsedExperts[13], parsedExperts[0]])
  const [textSuggest, setTextSuggest]: [
    undefined | string,
    React.Dispatch<React.SetStateAction<undefined | string>>
  ] = useState()
  const [wordSuggest, setWordSuggest]: [
    undefined | string,
    React.Dispatch<React.SetStateAction<undefined | string>>
  ] = useState()
  const [wordToCheck, setWordToCheck]: [
    undefined | string,
    React.Dispatch<React.SetStateAction<undefined | string>>
  ] = useState()
  const [translateText, setTranslateText]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false)
  const [correct, setCorrect]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(true)
  const [correctLoading, setCorrectLoading]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false)
  const [synonymsLoading, setSynonymsLoading]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false)
  const [translateLoading, setTranslateLoading]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false)
  const [title, setTitle]: [
    undefined | string,
    React.Dispatch<React.SetStateAction<undefined | string>>
  ] = useState()
  const textRef = useRef<any>(null)
  const [isSidebar, setIsSidebar] = useState(false)

  useEffect(() => {
    setText(document?.text)
    setTitle(document?.title)
  }, [document])

  useEffect(() => {
    HandleSaveDocument(
      params.user_id,
      params.id,
      title as string,
      text as string
    )
  }, [text, title, correct])

  const handleCorrection = (): void => {
    const content = `
    <contract>
    ${text}
    </contract>
    <experts>
    ${selectedExperts
      .map(
        (expert) => `Expert: ${expert.label} Description: ${expert.description}`
      )
      .join('')}
    </experts>`

    HandleCheckText(
      content as string,
      document?.language as string,
      setTextSuggest,
      setCorrect,
      setCorrectLoading,
      params.user_id
    )
  }

  const handleSynonyms = (): void => {
    HandleCheckWord(
      wordToCheck as string,
      document?.language as string,
      setWordSuggest,
      setSynonymsLoading,
      params.user_id
    )
  }

  const handleTranslate = (): void => {
    HandleTranslateText(
      text as string,
      document?.language as string,
      setTranslateLoading,
      setText,
      setTranslateText,
      params.user_id
    )
  }

  const handleChange = (evt: any) => {
    setText(evt.target.value)
  }

  const handleDoubleClick = (): void => {
    setWordToCheck(window.getSelection()?.toString())
  }

  const onSelectedExpertsChange = (selected: any) => {
    setSelectedExperts(selected)
  }

  if (isLoading && !document) return <Loading />

  if (error) return <div>{error}</div>

  if (!isLogged) return <div>You are not authorized</div>

  if (document)
    return (
      <div className={styles.doc}>
        <DocumentContext.Provider
          value={{ document: document, setDocument: setDocument }}
        >
          <AnimatePresence>
            {isSidebar && (
              <SidebarDocument
                setIsSidebar={setIsSidebar}
                textRef={textRef}
                title={title as string}
              />
            )}
          </AnimatePresence>
          <div className={styles.doc__sidebar__nav}>
            <Link href="/account">
              <svg
                className={styles.nav__logo}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 300 300.251"
              >
                <path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59H300M36.01 19.54h40.65l187.13 262.13h-40.66" />
              </svg>
            </Link>
            <svg
              onClick={() => setIsSidebar(true)}
              className={styles.nav__bars}
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </div>
          <div className={styles.doc__document}>
            <input
              type="text"
              className={styles.doc__document__title}
              placeholder={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextCustomBar textRef={textRef} />
            <ContentEditable
              onDoubleClick={handleDoubleClick}
              id="content"
              innerRef={textRef}
              html={text ? (text as string) : ''}
              onChange={(e) => handleChange(e)}
              data-placeholder="Type or paste (Ctrl + V ) your text here or upload from document"
              className={styles.doc__document__text}
            />
          </div>

          <div className={styles.doc__suggestions}>
            <h5 className={styles.doc__suggestions__title}>Select Experts</h5>
            <Select
              isMulti
              options={parsedExperts}
              defaultValue={selectedExperts}
              onChange={onSelectedExpertsChange}
              className={styles.doc__suggestions__select}
            />
            <h5 className={styles.doc__suggestions__title}>All Suggestions</h5>

            <button
              disabled
              title="Double Click Word And Check"
              onClick={handleSynonyms}
              className={styles.doc__suggestions__btn}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M17 9.761v-4.761c0-2.761-2.238-5-5-5-2.763 0-5 2.239-5 5v4.761c-1.827 1.466-3 3.714-3 6.239 0 4.418 3.582 8 8 8s8-3.582 8-8c0-2.525-1.173-4.773-3-6.239zm-8-4.761c0-1.654 1.346-3 3-3s3 1.346 3 3v3.587c-.927-.376-1.938-.587-3-.587s-2.073.211-3 .587v-3.587zm4 11.723v2.277h-2v-2.277c-.596-.347-1-.984-1-1.723 0-1.104.896-2 2-2s2 .896 2 2c0 .738-.404 1.376-1 1.723z" />
              </svg>
              Generate Contract{' '}
            </button>
            <button
              title="Click To Check Grammar"
              onClick={handleCorrection}
              className={styles.doc__suggestions__btn}
            >
              Review Contract
            </button>
            {/* <button
              title="Click To Translate Text To Your Selected Language"
              onClick={handleTranslate}
              className={styles.doc__suggestions__btn__green}
            >
              Generate Requirements
            </button> */}

            <div className={styles.doc__suggestions__active}>
              {synonymsLoading ? (
                <CircularProgress style={{ margin: '5rem auto 1rem auto' }} />
              ) : (
                wordSuggest && (
                  <SynonymsWords
                    text={wordSuggest}
                    setWordSuggest={setWordSuggest}
                  />
                )
              )}
              {translateLoading ? (
                <CircularProgress style={{ margin: '5rem auto 1rem auto' }} />
              ) : (
                translateText && (
                  <TranslateText
                    language={document.language}
                    setTranslate={setTranslateText}
                  />
                )
              )}
              {correctLoading ? (
                <CircularProgress style={{ margin: '5rem auto 1rem auto' }} />
              ) : correct ? (
                <>
                  <img
                    className={styles.doc__suggestions__active__img}
                    src="/undraw.png"
                    alt="correct"
                  />
                  <h5 className={styles.doc__suggestions__active__message}>
                    No Feedback Your Contract is Good!
                  </h5>
                </>
              ) : (
                <CorrectText
                  text={textSuggest as string}
                  mistakeText={text as string}
                  setMistakeText={setText}
                  setCorrect={setCorrect}
                  setText={setTextSuggest}
                />
              )}
            </div>
          </div>
        </DocumentContext.Provider>
      </div>
    )
}

export default Doc
