class Notification {
    constructor() {
        this.id(uuid())

        return this
    }

    id(id) {
        this.id = id

        return this
    }

    title(title) {
        this.title = title

        return this
    }

    body(body) {
        this.body = body

        return this
    }

    actions(actions) {
        this.actions = actions

        return this
    }

    status(status) {
        this.status = status

        return this
    }

    color(color) {
        this.color = color

        return this
    }

    icon(icon) {
        this.icon = icon

        return this
    }

    iconColor(color) {
        this.iconColor = color

        return this
    }

    duration(duration) {
        this.duration = duration

        return this
    }

    seconds(seconds) {
        this.duration(seconds * 1000)

        return this
    }

    persistent() {
        this.duration('persistent')

        return this
    }

    danger() {
        this.status('danger')

        return this
    }

    info() {
        this.status('info')

        return this
    }

    success() {
        this.status('success')

        return this
    }

    warning() {
        this.status('warning')

        return this
    }

    view(view) {
        this.view = view

        return this
    }

    viewData(viewData) {
        this.viewData = viewData

        return this
    }

    send() {
        window.dispatchEvent(
            new CustomEvent('notificationSent', {
                detail: {
                    notification: this,
                },
            }),
        )

        return this
    }
}

export default Notification
