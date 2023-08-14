import Link from "next/link"

interface ProcessCardType {
    icon: React.ReactNode
    title: string
    description: string
    linkTo: string
  }
  
  const ProcessCard = (props:ProcessCardType) => (
    <Link className="processCard" href={props.linkTo}>
      <div className="icon">
        {props.icon}
      </div>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </Link>
  )

  export default ProcessCard