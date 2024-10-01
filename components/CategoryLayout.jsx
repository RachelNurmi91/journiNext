"use client"

import Header from "@components/segments/Header"


const CategoryLayout = ({
  title, 
  subtitle, 
  navigation,
  renderForm, 
  formBtnTitle,
  formBtnOnClick,  
}) => {

  return (
    <section className="w-full">
      <Header 
        title={title}
        subtitle={subtitle}
        showNav={navigation.showNav} 
        navLeft={navigation.navLeft} 
        navLeftLink={navigation.navLeftLink} 
      />
        <form className="w-full mt-6">
          <div className="flex flex-wrap -mx-3 mb-6">
            {renderForm()}
          </div>
        </form>
        <div className="flex justify-end">
          <button 
            type='submit'
            className="black_btn"
            onClick={(e) => formBtnOnClick(e)}
          >
            {formBtnTitle}
          </button>  
        </div>
        
    </section>
  )
}

export default CategoryLayout