import React from 'react'
import { EuiSpacer } from '@elastic/eui'
import { ComboBoxFacet } from './ComboBoxFacet'
import { ListFacet } from './ListFacet'
import { RangeSliderFacet } from './RangeSliderFacet'
import { DateRangeFacet } from './DateRangeFacet'

export const FacetsContainer = (components = []) => {
  const componentTypeMap = [
    ...components,
    ListFacet,
    ComboBoxFacet,
    RangeSliderFacet,
    DateRangeFacet
  ].reduce((sum, component) => {
    sum[component.DISPLAY] = component
    return sum
  }, {})
  return ({ data, loading }) => (
    <>
      {data?.facets.map((facet) => {
        const Component = componentTypeMap[facet.display]
        if (!Component) {
          throw new Error(facet.display + ' not available')
        }
        return (
          <div key={facet.id}>
            <Component facet={facet} loading={loading} />
            <EuiSpacer size="l" />
          </div>
        )
      })}
    </>
  )
}