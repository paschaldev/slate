/** @jsx h */

import h from '../../../helpers/h'

export default function(change) {
  change.deleteLineBackward()
}

export const input = (
  <value>
    <document>
      <paragraph>
        one <link>wo📛rd</link>
        <cursor />
      </paragraph>
    </document>
  </value>
)

export const output = (
  <value>
    <document>
      <paragraph>
        <cursor />
      </paragraph>
    </document>
  </value>
)
