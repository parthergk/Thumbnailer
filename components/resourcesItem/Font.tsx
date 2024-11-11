import React from 'react'

const Font = () => {
    interface FontItems{
        name: string
        value: string
      }
    
      const fonts = ["Family", "Width", "Style", "Size"]
      // const fonts = ["Font-Family", "Font-Width", "Font-Style", "Font-Size"]
      
    return (
        <div className=" w-full flex flex-col gap-2 my-5">
            {
                fonts.map((font) => <div key={font} className=" flex justify-between">
                    <span className=" text-sm">{font}</span>
                    <span className=" text-sm">Arial</span>
                </div>)
            }
        </div>
    )
}

export default Font