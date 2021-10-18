import { createClient } from "contentful"
import Card from '../components/CardPage'

export async function getStaticProps(){
  const client = createClient({
    space:process.env.CONTENTFUL_SPACE_ID,
    accessToken:process.env.CONTENTFUL_TOKEN,
  })
  const res = await client.getEntries({content_type: process.env.CONTENTFUL_CONTENT_TYPE})
  
  return{
    props: {
      cards: res.items
    },
    revalidate: 10
  } 
}
export default function AllCards({cards}) {
  console.log(cards)
  return (
    <div className="recipe-list">
      {cards.map(card => (
        <Card key={card.sys.id} card={card} />
      ))}
      <style jsx>{`
        .recipe-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 60px;
        }
      `}</style>
    </div>
  )
}