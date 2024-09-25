import Link from "next/link"

const Card = ({ 
  title, 
  subtitle,
  rightIcon,
  rightIconLink,
}) => {

  return (
    <div className={subtitle ? '' : 'flex justify-between'}>
      <h1 className="journi-page-title">{title}</h1>
      {subtitle && <p>{subtitle}</p>}
      {rightIcon && (
        <Link href={rightIconLink}>
          <span className="journi-page-title">{rightIcon}</span>
        </Link>
      )}
    </div>
  )
}

export default Card