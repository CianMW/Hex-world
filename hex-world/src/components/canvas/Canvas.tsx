import { useEffect, useRef } from "react"




function Canvas (){

    const canvasRef = useRef(null)
  
  const draw = (ctx:any, frameCount:any) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    ctx.fill()
  }
  
  useEffect(() => {
    
    const canvas = canvasRef.current
    //@ts-ignore
    const context = canvas!.getContext('2d')
    let frameCount = 0
    let animationFrameId:any
    
    //Our draw came here
    const render = () => {
      frameCount++
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
    return(
        <div className="container" id="grid" style={{"padding": 0}}>
        <canvas id="canvas" ref={canvasRef}  className="border border-dark"></canvas>
    </div>
    )
}

export default Canvas