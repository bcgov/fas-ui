import KeyCloakService from 'sbc-common-components/src/services/keycloak.services'
import { DirectiveBinding, VNode } from 'vue'

interface CustomHTMLElement extends HTMLElement {
  disabled: boolean
  readOnly: boolean
}

function canAccess (binding: DirectiveBinding, el: HTMLElement, node: VNode) {
  const behaviour = binding.modifiers.disable ? 'disable' : 'hide'
  // to handle special elements like v-card etc
  const isCard = !!binding.modifiers.card
  const requestedAction:any = [binding.arg]
  const customeEl = el as CustomHTMLElement
  const okayToAccess = KeyCloakService.verifyRoles(requestedAction, [])
  // if not okay , hide or disable
  if (!okayToAccess) {
    if (behaviour === 'hide') {
      commentNode(el, node)
    } else if (behaviour === 'disable' && isCard === false) {
      customeEl.disabled = true
    } else if (behaviour === 'disable' && isCard === true) {
      // TODO tab still works.. can tab to the text field and make it work
      customeEl.classList.add('v-card--disabled')
      customeEl.style.pointerEvents = 'none'
    }
  }
}

/**
 * Create comment node
 *
 * @private
 * @author https://stackoverflow.com/questions/43003976/a-custom-directive-similar-to-v-if-in-vuejs#43543814
 */
function commentNode (el: HTMLElement, vnode: VNode) {
  const comment = document.createComment(' ')

  Object.defineProperty(comment, 'setAttribute', {
    value: () => undefined
  })

  vnode.el.text = ' '
  vnode.el.elm = comment
  vnode.el.isComment = true
  vnode.el.tag = undefined

  vnode.el.data = vnode.el.data || {}
  vnode.el.data.directives = undefined

  if (vnode.el.componentInstance) {
    vnode.el.componentInstance = comment
  }

  if (el.parentNode) {
    el.parentNode.replaceChild(comment, el)
  }
}

export const can = {
  mounted (el, binding, node) {
    canAccess(binding, el, node)
  },
  updated (el, binding, node) {
    canAccess(binding, el, node)
  }
}
