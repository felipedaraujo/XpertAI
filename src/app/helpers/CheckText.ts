import axios from 'axios'

export const HandleCheckText = (
  text: string,
  language: string,
  setTextSuggest: React.Dispatch<React.SetStateAction<undefined | string>>,
  setCorrect: React.Dispatch<React.SetStateAction<boolean>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  _id: string
) => {
  console.log('will call text check')
  setLoading(true)

  axios
    .post('/api/text-check', {
      text: text,
      language: language,
      _id: _id,
    })
    .then(({ data }) => {
      console.log('called text check', data)

      setLoading(false)

      if (data.error) {
        console.dir(data, { depth: null })
      } else {
        if (data.success.correct == false) {
          setCorrect(false)
          setTextSuggest(data.success.text)
        } else {
          setCorrect(true)
          setTextSuggest(data.success.text)
        }
      }
    })
    .catch((err) => {
      console.log(err)
      setLoading(false)
    })
}
