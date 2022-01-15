/* eslint-disable react/forbid-dom-props */
import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import styles from './index.less'

interface IProps {
  data: string[]
  step: number
  className?: string
  onChange?: (stepIndex: number) => number
  stepWidth: number
  gutter: number
}

const MSStep: React.FC<IProps> = props => {
  const { data, step, className, onChange, stepWidth, gutter } = props
  const [currentStep, setCurrentStep] = useState<number>(step)

  useEffect(() => {
    if (currentStep !== step) {
      setCurrentStep(step)
    }
  }, [currentStep, step])

  const setStep = (stepIndex: number) => {
    if (onChange) {
      const computedStepIndex = onChange(stepIndex)
      setCurrentStep(computedStepIndex)
    } else {
      setCurrentStep(stepIndex)
    }
  }

  const stepItems = data.map((stepItem, index) => {
    const stepIndex = index + 1
    const stepCls = classnames(styles.step, {
      [styles.active]: currentStep >= stepIndex,
      [styles.activeLine]: currentStep > stepIndex
    })
    return (
      <div
        key={index}
        className={stepCls}
        style={{ width: index !== 0 ? gutter - stepWidth : stepWidth }}
      >
        <div className={styles.stepInner}>
          <div className={styles.stepIndex} onClick={setStep.bind(null, stepIndex)}>
            {stepIndex}
          </div>
          <div className={styles.stepTitle}>
            <span onClick={setStep.bind(null, stepIndex)}>{stepItem}</span>
          </div>
        </div>
      </div>
    )
  })

  return <div className={classnames(className, styles.stepWrapper)}>{stepItems}</div>
}

export default MSStep
