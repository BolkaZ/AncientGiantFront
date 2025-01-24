import { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useLocation } from "react-router-dom";



  
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
        {breadcrumb.length !== 0 && <Breadcrumb>
          {breadcrumb.map((item) => (
            <Breadcrumb.Item key={item.title} active={!item.link} href={item.link !== undefined ? item.link : ''}>
              <span>{item.title}</span>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>}
      </>

    )
}
