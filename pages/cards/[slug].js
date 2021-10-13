import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Image from 'next/image'
import Skeleton from '../../components/Skeleton'

const client = createClient({
  space:process.env.CONTENTFUL_SPACE_ID,
  accessToken:process.env.CONTENTFUL_TOKEN,
})

export const getStaticPaths = async () => {
    const res = await client.getEntries({ 
    content_type: process.env.CONTENTFUL_CONTENT_TYPE 
  })

  const paths = res.items.map(item => {
    //console.log('Slug' +  item.fields.slug + ' --')
    return {
            params: { slug: item.fields.slug }
    }
  })
  //console.log('aun' +  paths + ' Kumar')
  return {
    paths : paths,
    fallback: true
  }
} 


export const getStaticProps = async ({ params }) => {
  //console.log(params.slug)
  const { items } = await client.getEntries({
    content_type: process.env.CONTENTFUL_CONTENT_TYPE,
    'fields.slug': params.slug    
  })

  if (!items.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  
  return {
    props: { card: items[0] },
    revalidate: 10
  }

}

export default function CardDetails({ card }) {
  if (!card) return <Skeleton/>
  const { featuredImage, title, timing, consultationFee, details } = card.fields
  //console.log(details)

  return (
    <div>
    <div className="banner">
      <Image 
        src={'https:' + featuredImage.fields.file.url}
        width={featuredImage.fields.file.details.image.width}
        height={featuredImage.fields.file.details.image.height}
      />
      <h2>{ title }</h2>
    </div>

    <div className="info">
      <p>Rate is  { consultationFee } </p>
      <h3>Timing:</h3>

      {timing.map(ing => (
        <span key={ing}>{ ing }</span>
      ))}
    </div>
      
    <div className="method">
      <h3>Method:</h3>
      <div>{documentToReactComponents(details)}</div>
    </div>

    <style jsx>{`
      h2,h3 {
        text-transform: uppercase;
      }
      .banner h2 {
        margin: 0;
        background: #fff;
        display: inline-block;
        padding: 20px;
        position: relative;
        top: -60px;
        left: -10px;
        transform: rotateZ(-1deg);
        box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
      }
      .info p {
        margin: 0;
      }
      .info span::after {
        content: ", ";
      }
      .info span:last-child::after {
        content: ".";
      }
    `}</style>
  </div>
  )
}
