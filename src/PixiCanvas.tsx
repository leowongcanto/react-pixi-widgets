import React, {
  useRef,
  PropsWithChildren,
  Children,
  useLayoutEffect,
} from 'react'
import * as PIXI from 'pixi.js'
import * as ReactIs from 'react-is'
import { debounce } from 'lodash'
import './PixiCanvas.css'

interface Props {
  loader: PIXI.Loader
  internalHeight: number
  internalWidth: number
}

function PixiCanvas({
  children,
  loader,
  internalHeight,
  internalWidth,
}: PropsWithChildren<Props>) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const parentRef = useRef<HTMLDivElement>(null)
  const renderer = useRef<PIXI.AbstractRenderer>()

  useLayoutEffect(() => {
    renderer.current = PIXI.autoDetectRenderer({
      height: parentRef.current?.clientHeight,
      width: parentRef.current?.clientWidth,
      view: canvasRef?.current || undefined,
      resolution:
        ((parentRef.current?.clientWidth || internalHeight) / internalWidth) *
        PIXI.settings.RESOLUTION,
      transparent: true,
    })
    function handleResize() {
      if (renderer && renderer.current) {
        renderer.current.view.width =
          parentRef.current?.clientWidth || renderer.current.view.width
        renderer.current.view.height =
          parentRef.current?.clientHeight || renderer.current.view.height
        renderer.current.resolution =
          (renderer.current.view.width / internalWidth) *
          PIXI.settings.RESOLUTION
      }
    }
    const func = debounce(handleResize, 500)

    window.addEventListener('resize', func)
    return () => {
      window.removeEventListener('resize', func)
    }
  }, [])

  return (
    <div ref={parentRef} className="parent">
      <canvas ref={canvasRef}>
        {Children.toArray(children).map((child) => {
          if (ReactIs.isElement(child)) {
            return React.cloneElement(child, {
              ...child.props,
              renderer: renderer,
              loader,
            })
          }
        })}
      </canvas>
    </div>
  )
}

export default PixiCanvas
