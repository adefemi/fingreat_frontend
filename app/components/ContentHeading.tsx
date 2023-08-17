import Link from "next/link";
import {IoArrowBackCircleSharp} from "react-icons/io5"

interface ContentHeadingType {
    title: string;
    sideSection: React.ReactNode
}

const ContentHeading = (props:ContentHeadingType) => {
    return <div className="content-heading">
    <div className="title">
      <Link href="/"><IoArrowBackCircleSharp size={20} /></Link>
      <h2>{props.title}</h2>
    </div>
    <div className="side-section">
        {props.sideSection}
    </div>
  </div>
}

export default ContentHeading