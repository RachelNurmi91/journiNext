
import Link from "next/link"

const HeaderNav = ({ 
  leftIcon,
  leftLink,
  rightIcon,
  rightLink,
}) => {

  return (
    <div className="flex justify-between mb-5">
      {leftIcon ? (      
        <Link href={leftLink}>
        <div className="bg-slate-200 font-bold rounded-full" style={{height: "40px", width: "40px"}}>
          {leftIcon}
        </div>
      </Link>) : (
        <div></div>
      )}

      {rightIcon ? (
        <Link href={rightLink}>
        <div className="bg-sky-300 font-bold rounded-full" style={{height: "40px", width: "40px"}}>
          {rightIcon}
        </div>
      </Link>) : (
        <div></div>
      )}
      
    </div>
  )
}

export default HeaderNav