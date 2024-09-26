
import Link from "next/link"

const HeaderNav = ({ 
  leftIcon,
  leftLink,
  rightIcon,
  rightLink,
}) => {

  return (
    <div className="flex justify-between mb-2">
      {leftIcon ? (      
        <Link href={leftLink}>
        <div className="bg-slate-200 font-bold rounded-full flex justify-center items-center" style={{height: "40px", width: "40px"}}>
          <span style={{marginTop: "-5px"}}>
            {leftIcon}
          </span>
        </div>
      </Link>) : (
        <div></div>
      )}

      {rightIcon ? (
        <Link href={rightLink}>
        <div className="bg-sky-300 font-bold rounded-full flex justify-center items-center" style={{height: "40px", width: "40px"}}>
          <span style={{marginTop: "-5px"}}>
            {rightIcon}
          </span>
        </div>
      </Link>) : (
        <div></div>
      )}
      
    </div>
  )
}

export default HeaderNav