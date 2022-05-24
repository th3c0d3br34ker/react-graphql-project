import { Form } from "semantic-ui-react"

const avatarOptions = [
  {
    key: 'molly',
    value: 'molly',
    text: 'Molly',
    image: { avatar: true, src: 'https://semantic-ui.com/images/avatar2/small/molly.png' }
  },
  {
    key: 'elyse',
    value: 'elyse',
    text: 'Elyse',
    image: { avatar: true, src: 'https://semantic-ui.com/images/avatar2/small/elyse.png' }
  },
  {
    key: 'kristy',
    value: 'kristy',
    text: 'Kristy',
    image: { avatar: true, src: 'https://semantic-ui.com/images/avatar2/small/kristy.png' }
  },
  {
    key: 'lena',
    value: 'lena',
    text: 'Lena',
    image: { avatar: true, src: 'https://semantic-ui.com/images/avatar2/small/lena.png' }
  },
  {
    key: 'lindsay',
    value: 'lindsay',
    text: 'Lindsay',
    image: { avatar: true, src: 'https://semantic-ui.com/images/avatar2/small/lindsay.png' }
  },
  {
    key: 'mark',
    value: 'mark',
    text: 'Mark',
    image: { avatar: true, src: 'https://semantic-ui.com/images/avatar2/small/mark.png' }
  },
  {
    key: 'matthew',
    value: 'matthew',
    text: 'Matthew',
    image: { avatar: true, src: 'https://semantic-ui.com/images/avatar2/small/matthew.png' }
  },
  {
    key: 'patrick',
    value: 'patrick',
    text: 'Patrick',
    image: { avatar: true, src: 'https://semantic-ui.com/images/avatar2/small/patrick.png' }
  },
]


const AvatarFormSelect = ({ handleAvatarChange }) => (
  <Form.Select label="Select Avatar" name="image" options={avatarOptions} onChange={handleAvatarChange} />
)
export default AvatarFormSelect
