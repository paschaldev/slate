/** @jsx h */

import h from '../../../helpers/h'

export default function(change) {
  change.deleteCharBackward()
}

export const input = (
  <value>
    <document>
      <paragraph>
        <link>
          word📛<cursor />
        </link>
      </paragraph>
    </document>
  </value>
)

export const output = (
  <value>
    <document>
      <paragraph>
        <link>
          word<cursor />
        </link>
      </paragraph>
    </document>
  </value>
)
