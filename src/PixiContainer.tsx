import * as PIXI from 'pixi.js'
import React, {
  PropsWithChildren,
  useEffect,
  useRef,
  Children,
  MutableRefObject,
} from 'react'
import * as ReactIs from 'react-is'

interface Props {
  renderer?: MutableRefObject<PIXI.AbstractRenderer>
  loader?: PIXI.Loader
  fps: number
}

function PixiContainer({
  children,
  renderer,
  loader,
  fps,
}: PropsWithChildren<Props>) {
  const container = useRef<PIXI.Container>(new PIXI.Container())
  const rendering = () => {
    container.current && renderer?.current.render(container.current)
  }
  const interval = setInterval(rendering, 1000 / fps)
  useEffect(() => {
    return () => {
      clearInterval(interval)
    }
  }, [container])
  return (
    <>
      {Children.toArray(children).map((child) => {
        if (ReactIs.isElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            renderer,
            container,
            loader,
          })
        }
      })}
    </>
  )
}

export default PixiContainer
