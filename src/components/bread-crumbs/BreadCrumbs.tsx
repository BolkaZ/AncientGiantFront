import { useEffect, useState } from "react";
import {Link, useLocation} from 'react-router-dom';

  export type TBreadcrumbsItem = {
    title: string;
    link?: string;
  };

export const BreadCrumbs = () => {
    
    const location = useLocation();
    const [breadcrumb, setBreadCrumb] = useState<TBreadcrumbsItem[]>([]);
  
    const breadCrumbByPath: {[key: string]:string} =  {
      ['']: 'Главная',
      ['catalog']: 'Каталог',
      ['registration']: 'Регистрация',
      ['authorization']: 'Авторизация',
      ['user']: 'Пользователь',
      ['bids']: 'Заявки',
      ['bid']: 'Заявка',
    }
  
    useEffect(()=> {
      const pathes = location.pathname.split('/');
  
      if(pathes[0] === '' && pathes[1] === '') {
        pathes.shift()
        pathes.shift()

      }
  
      const breadcrumbTemp: any[] = []
      
      pathes.map((path: string,index : number)=>{
  
        if(breadCrumbByPath[path] !== undefined) {
          
          breadcrumbTemp.push({title: breadCrumbByPath[path], link: pathes.length-1 !== index ? '/' + path : undefined })
        } else {
  
          breadcrumbTemp.push({title: path })
        }
      })
  
      setBreadCrumb(breadcrumbTemp);
      
    },[location.pathname])
  

    return (
      <>
        {breadcrumb.length !== 0 && <ol className={'d-flex gap-1 breadcrumb'}>
          {breadcrumb.map((item, index) => (
            <>
            {index >= 1 && (
              <li key={index} >
                <span> / </span>
              </li>
            )}
              {'link' in item && item.link !== undefined ? (
                <Link to={item.link}>{item.title}</Link>
              ) : (
                <span style={{opacity: 0.6}}>{item.title}</span>
              )}
            </>
          ))}
        </ol>}
      </>

    )
}
