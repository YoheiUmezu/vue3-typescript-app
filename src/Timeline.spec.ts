import { nextTick } from '@vue/runtime-core'
import { mount } from '@vue/test-utils'
import Home from './Home.vue'
import flushPromises from 'flush-promises'
import * as mockData from './mocks'

jest.mock('axios', () => ({
    get: (url: string) => ({
        data: [mockData.todayPost, mockData.thisWeek, mockData.thisMonth]
    })
}))

describe('Home', () => {
    it('renders a loader', () => {
        const wrapper = mount(Home)
        //loaderが表示されるか
        expect(wrapper.find('[data-test="progress"]').exists()).toBe(true)
    })

    it('renders 3 time periods', async() => {
        const wrapper = mount(Home)
        //3つの期間が表示されるか
        await flushPromises()
        expect(wrapper.findAll('[data-test="period"]')).toHaveLength(3)
    })

    it('updates the period when clicked', async() => {
        const wrapper = mount(Home)
        //クリックされた時に期間がアップデートされるか
        await flushPromises()

        const $today = wrapper.findAll('[data-test="period"]')[0]
        expect($today.classes()).toContain("is-active")

        const $thisWeek = wrapper.findAll('[data-test="period"]')[1]
        await $thisWeek.trigger('click')

        expect($today.classes()).not.toContain('is-active')
        expect($thisWeek.classes()).toContain('is-active')

        const $thisMonth = wrapper.findAll('[data-test="period"]')[2]
        await $thisMonth.trigger('click')
        
        expect($thisWeek.classes()).not.toContain('is-active')
        expect($thisMonth.classes()).toContain('is-active')
    })

    it('renders todays post by default', async() => {
        const wrapper = mount(Home)
        //でファオルトで今日のポストが表示されるか
        await flushPromises()

        expect(wrapper.findAll('[data-test="post"]')).toHaveLength(1)

        const $thisWeek = wrapper.findAll('[data-test="period"]')[1]
        await $thisWeek.trigger('click')

        expect(wrapper.findAll('[data-test="post"]')).toHaveLength(2)

        const $thisMonth = wrapper.findAll('[data-test="period"]')[2]
        await $thisMonth.trigger('click')

        expect(wrapper.findAll('[data-test="post"]')).toHaveLength(3)
    })

})