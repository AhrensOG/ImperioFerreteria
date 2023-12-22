import React from 'react'
import Card from './auxiliarComponents/Card'

const LowerSection = () => {
  return (
    <div className='flex flex-col sm:flex-row items-center gap-16 py-10 justify-evenly'>
      <Card title='Catálogo' description='Descarga nuestro catalogo.' subDescription='Puede consultarnos direcamente en linea.' button='Ir al catálogo' link='/products'/>
      <Card title='Contacto' description='Puede ponerse en contacto a través de nuestro whatsapp.' subDescription='' button='Contáctanos' link='#contact'/>
    </div>
  )
}

export default LowerSection