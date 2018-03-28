import * as d3 from 'd3'
import * as ev from '../../../events'
import * as tt from '../../../utilities/tooltip'
import Component from '../../component'

/**
 * Side buttons in control panel
 */
export default class ControlButtons extends Component {
  constructor (tooltip, uuid) {
    super()

    this.selection.classed('nav-controls', true)

    let buttonData = [
      {
        name: 'legendBtn',
        iconClass: 'icon-menu',
        tooltipText: 'Toggle Legend',
        event: ev.TOGGLE_LEGEND
      },
      {
        name: 'backBtn',
        iconClass: 'icon-left-big',
        tooltipText: 'Move backward',
        event: ev.MOVE_PREV
      },
      {
        name: 'nextBtn',
        iconClass: 'icon-right-big',
        tooltipText: 'Move forward',
        event: ev.MOVE_NEXT
      }
    ]

    // Save all the buttons for toggling state and stuff
    let buttons = buttonData.map(data => {
      let btnDiv = this.selection.append('div')
          .classed('btn', true)
          .on('mouseover', () => { tooltip.hidden = false })
          .on('mouseout', () => { tooltip.hidden = true })
          .on('mousemove', function () {
            tooltip.render(tt.parseText({ text: data.tooltipText }))
            tt.moveTooltip(tooltip, d3.select(this), 'left')
          })
          .on('click', () => ev.publish(uuid, data.event, {}))

      btnDiv.append('i')
        .classed(data.iconClass, true)
      return btnDiv
    })

    this.legendBtn = buttons[0]
  }

  get legendBtnState () {
    return this.legendBtn.classed('active')
  }

  set legendBtnState (state) {
    this.legendBtn.classed('active', state)
  }
}
