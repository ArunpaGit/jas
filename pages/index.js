import { createClient } from "contentful"
import DoctorCard from '../components/DoctorCard'

export async function getStaticProps(){
  const client = createClient({
    space:process.env.CONTENTFUL_SPACE_ID,
    accessToken:process.env.CONTENTFUL_TOKEN,

  })
  const res = await client.getEntries({content_type: process.env.CONTENTFUL_CONTENT_TYPE})
  
  return{
    props: {
      doctors: res.items
    },
    revalidate: 60
  } 
}
export default function Recipes({doctors}) {
  //console.log(doctors)
  return (
    <div className="recipe-list">
      {doctors.map(doctor => (
        <DoctorCard key={doctor.sys.id} doctor={doctor} />
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