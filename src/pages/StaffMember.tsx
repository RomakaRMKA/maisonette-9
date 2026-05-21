import StaffTag from './StaffTag'

export interface Tag {
  text: string
  color?: string
}

export interface StaffCardData {
  portrait: string
  name: string
  job: string
  bio?: string
  tags: Tag[]
}

export interface ToggleLabels {
  left: string
  right: string
}

export interface StaffMemberProps extends StaffCardData {
  hasAlternate?: boolean
  isAlternateActive?: boolean
  toggleLabels?: ToggleLabels
  onSelect: () => void
  onToggleVariant?: () => void
}

function StaffMember({
  portrait,
  name,
  job,
  tags,
  hasAlternate = false,
  isAlternateActive = false,
  toggleLabels = { left: 'Base', right: 'Alternate' },
  onSelect,
  onToggleVariant,
}: StaffMemberProps) {
  return (
    <article className={`staff-member-card${isAlternateActive ? ' is-active' : ''}`}>
      <div className="staff-member-portrait">
        <img src={portrait} alt={name} />
      </div>
      <div className="staff-member-info">
        <h3 className="staff-member-name">{name}</h3>
        <p className="staff-member-job">{job}</p>
        <div className="staff-member-tags">
          {tags.map((tag) => (
            <StaffTag key={`${name}-${tag.text}`} label={tag.text} color={tag.color} />
          ))}
        </div>
        <div className="staff-member-actions">
          <button type="button" className="staff-member-cta" onClick={onSelect}>
            View profile
          </button>
          {hasAlternate && onToggleVariant ? (
            <div className="staff-member-switch-row">
              <span
                className={`staff-member-switch-label${!isAlternateActive ? ' is-active' : ''}`}
              >
                {toggleLabels.left}
              </span>
              <button
                type="button"
                className={`staff-member-switch${isAlternateActive ? ' is-on' : ''}`}
                onClick={onToggleVariant}
                role="switch"
                aria-checked={isAlternateActive}
                aria-label={`Toggle between ${toggleLabels.left} and ${toggleLabels.right}`}
              >
                <span className="staff-member-switch-knob" aria-hidden="true" />
              </button>
              <span
                className={`staff-member-switch-label${isAlternateActive ? ' is-active' : ''}`}
              >
                {toggleLabels.right}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default StaffMember
