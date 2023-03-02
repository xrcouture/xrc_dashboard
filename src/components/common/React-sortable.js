import React from 'react'
import P from 'prop-types'
import SortableJS, { AutoScroll } from 'sortablejs/modular/sortable.core.esm.js' // sortablejs

const store = {
  nextSibling: null,
  activeComponent: null,
}

export default class Sortable extends React.Component {
  static propTypes = {
    options: P.object,
    onChange: P.func,
    as: P.oneOfType([P.string, P.func]),
    style: P.object,
  }

  static defaultProps = {
    options: {},
    as: 'div',
    style: {},
  }

  sortable = null

  componentDidMount() {
    const options = { ...this.props.options }
    const { onChange } = this.props // json,

    ;[
      'onChoose',
      'onStart',
      'onEnd',
      'onAdd',
      'onUpdate',
      'onSort',
      'onRemove',
      'onFilter',
      'onMove',
      'onClone',
    ].forEach((name) => {
      const eventHandler = options[name]
      options[name] = (...params) => {
        const [evt] = params

        if (name === 'onChoose') {
          store.nextSibling = evt.item.nextElementSibling
          store.activeComponent = this
        } else if ((name === 'onAdd' || name === 'onUpdate') && onChange) {
          const items = this.sortable.toArray()
          // console.log(items.map(v => JSON.stringify(v)));
          // console.log(items);
          const remote = store.activeComponent
          const remoteItems = remote.sortable.toArray()

          const referenceNode =
            store.nextSibling && store.nextSibling.parentNode !== null ? store.nextSibling : null
          evt.from.insertBefore(evt.item, referenceNode)
          if (remote !== this) {
            const remoteOptions = remote.props.options || {}

            if (typeof remoteOptions.group === 'object' && remoteOptions.group.pull === 'clone') {
              evt.item.parentNode.removeChild(evt.item) // Remove the node with the same data-reactid
            }
            remote.props.onChange && remote.props.onChange(remoteItems, remote.sortable, evt)
          }

          onChange && onChange(items, this.sortable, evt)
          // if(onChange){
          //   // const data = items.map(v => JSON.parse(v));
          //   let data;
          //   if(json) data = items.map(v => JSON.parse(v));
          //   else data = items;
          //   console.log(data);
          //   onChange(data, this.sortable, evt);
          // }
        }

        if (evt.type === 'move') {
          const [evt, originalEvent] = params
          const canMove = eventHandler ? eventHandler(evt, originalEvent) : true
          return canMove
        }

        setTimeout(() => {
          eventHandler && eventHandler(evt)
        }, 0)
      }
    })

    // this.sortable = SortableJS.create(this.node, options);// ORI
    SortableJS.mount(new AutoScroll())
    this.sortable = SortableJS.create(this.node, options)
  }

  shouldComponentUpdate(nextProps) {
    // If onChange is null, it is an UnControlled component Don't let React re-render it by setting return to false
    if (!nextProps.onChange) {
      return false
    }
    return true
  }

  componentWillUnmount() {
    if (this.sortable) {
      this.sortable.destroy()
      this.sortable = null
    }
  }

  render() {
    const {
      as: As,
      options, // eslint-disable-line
      // onChange, // eslint-disable-line
      // json, // Q-CUSTOM
      children,
      ...etc
    } = this.props

    return (
      <As
        {...etc}
        ref={(node) => {
          this.node = node
        }}
      >
        {children}
      </As>
    )
  }
}

// export default ReactSortable;
