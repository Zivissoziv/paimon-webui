/* Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License. */

import type { FormInst } from 'naive-ui'
import type { FormRules, IFormInst, IFormItemRule } from './types'

export function useFormHooks(): IFormInst & { state: { formRef: FormInst } } {
  const state = reactive({
    formRef: ref(),
  })

  const validate = async (...args: []) => {
    return state.formRef.validate(...args)
  }

  const setValues = (initialValues: { [field: string]: any }) => {
    for (const [key, value] of Object.entries(initialValues))
      state.formRef.model[key] = value
  }

  const restoreValidation = () => {
    state.formRef.restoreValidation()
  }

  const resetValues = (initialValues: { [field: string]: any }) => {
    const modelKeys = Object.keys(state.formRef.model)
    for (const key of modelKeys) {
      if (!Object.keys(initialValues).includes(key))
        delete state.formRef.model[key]
    }
    setValues(initialValues)
  }

  const getValues = () => {
    return state.formRef.model
  }

  const formatValidate = (
    validate?: IFormItemRule | FormRules,
  ): IFormItemRule => {
    if (!validate)
      return {}
    if (Array.isArray(validate)) {
      validate.forEach((item: IFormItemRule) => {
        if (!item?.message)
          delete item.message
        return item
      })
    }
    if (!validate.message)
      delete validate.message
    return validate
  }

  return {
    state,
    validate,
    setValues,
    getValues,
    resetValues,
    restoreValidation,
    formatValidate,
  }
}
