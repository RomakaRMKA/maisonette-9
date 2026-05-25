import { useEffect, useState } from 'react'
import StaffMember from './StaffMember'
import type { StaffCardData, ToggleLabels } from './StaffMember'
import './StaffPage.css'
import rawHostsMembers from '../data/hosts.json'
import rawStaffMembers from '../data/staff.json'

const staffPortraits = import.meta.glob('../assets/staff/*.{png,jpg,jpeg,webp,avif,gif,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

function resolvePortraitPath(rawPortraitPath: string): string {
  const fileName = rawPortraitPath.split('/').pop()

  if (!fileName) {
    return rawPortraitPath
  }

  return staffPortraits[`../assets/staff/${fileName}`] ?? rawPortraitPath
}

type StaffVariant = 'base' | 'alternate'

interface StaffProfile extends StaffCardData {
  id: number
  alternateCard?: StaffCardData
  toggleLabels?: ToggleLabels
}

interface SelectedStaff {
  section: StaffSection
  id: number
}

type StaffSection = 'Hosts' | 'Staff Members'

const hostsMembers = rawHostsMembers as StaffProfile[]
const staffMembers = rawStaffMembers as StaffProfile[]

function getStaffKey(section: StaffSection, id: number): string {
  return `${section}-${id}`
}

function resolveCardData(member: StaffProfile, variant: StaffVariant): StaffCardData {
  if (variant === 'alternate' && member.alternateCard) {
    return member.alternateCard
  }

  return member
}

function resolveToggleLabels(member: StaffProfile): ToggleLabels {
  return {
    left: member.toggleLabels?.left ?? 'Base',
    right: member.toggleLabels?.right ?? 'Alternate',
  }
}

function StaffPage() {
  const [selectedStaff, setSelectedStaff] = useState<SelectedStaff | null>(null)
  const [activeVariants, setActiveVariants] = useState<Record<string, StaffVariant>>({})

  function getActiveVariant(section: StaffSection, id: number): StaffVariant {
    return activeVariants[getStaffKey(section, id)] ?? 'base'
  }

  function toggleVariant(section: StaffSection, id: number) {
    const key = getStaffKey(section, id)

    setActiveVariants((currentVariants) => ({
      ...currentVariants,
      [key]: currentVariants[key] === 'alternate' ? 'base' : 'alternate',
    }))
  }

  function getSelectedCard() {
    if (!selectedStaff) {
      return null
    }

    const members = selectedStaff.section === 'Hosts' ? hostsMembers : staffMembers
    const member = members.find((entry) => entry.id === selectedStaff.id)

    if (!member) {
      return null
    }

    const variant = getActiveVariant(selectedStaff.section, selectedStaff.id)

    return {
      member,
      variant,
      card: resolveCardData(member, variant),
    }
  }

  useEffect(() => {
    if (!selectedStaff) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedStaff(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedStaff])

  return (
    <section className="content-panel" id="staff">
      <h1 style={{ textAlign: "center", margin: "3rem" }}>Hosts</h1>
      <div className="staff-grid" id="staff-hosts">
        {hostsMembers.map((member) => (
          (() => {
            const section: StaffSection = 'Hosts'
            const variant = getActiveVariant(section, member.id)
            const displayedCard = resolveCardData(member, variant)
            const toggleLabels = resolveToggleLabels(member)

            return (
          <StaffMember
            key={member.id}
                portrait={resolvePortraitPath(displayedCard.portrait)}
                name={displayedCard.name}
                job={displayedCard.job}
                tags={displayedCard.tags}
                hasAlternate={Boolean(member.alternateCard)}
                isAlternateActive={variant === 'alternate'}
                toggleLabels={toggleLabels}
                onSelect={() => setSelectedStaff({ section, id: member.id })}
                onToggleVariant={() => toggleVariant(section, member.id)}
          />
            )
          })()
        ))}
      </div>
      <h1 style={{ textAlign: "center", margin: "3rem" }}>Staff Members</h1>
      <div className="staff-grid" id="staff-staff">
        {staffMembers.map((member) => (
          (() => {
            const section: StaffSection = 'Staff Members'
            const variant = getActiveVariant(section, member.id)
            const displayedCard = resolveCardData(member, variant)
            const toggleLabels = resolveToggleLabels(member)

            return (
          <StaffMember
            key={member.id}
                portrait={resolvePortraitPath(displayedCard.portrait)}
                name={displayedCard.name}
                job={displayedCard.job}
                tags={displayedCard.tags}
                hasAlternate={Boolean(member.alternateCard)}
                isAlternateActive={variant === 'alternate'}
                toggleLabels={toggleLabels}
                onSelect={() => setSelectedStaff({ section, id: member.id })}
                onToggleVariant={() => toggleVariant(section, member.id)}
          />
            )
          })()
        ))}
      </div>
      {getSelectedCard() ? (
        (() => {
          const selectedCard = getSelectedCard()

          if (!selectedCard) {
            return null
          }

          const section = selectedStaff?.section ?? 'Staff Members'
          const toggleLabels = resolveToggleLabels(selectedCard.member)
          const variantLabel = selectedCard.variant === 'alternate' ? toggleLabels.right : toggleLabels.left

          return (
        <div className="staff-popover-backdrop" onClick={() => setSelectedStaff(null)}>
          <aside
            className="staff-popover"
            role="dialog"
            aria-modal="true"
            aria-labelledby="staff-popover-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="staff-popover-close"
              onClick={() => setSelectedStaff(null)}
              aria-label="Close staff details"
            >
              ×
            </button>
            <div className="staff-popover-layout">
              <div className="staff-popover-portrait">
                <img src={resolvePortraitPath(selectedCard.card.portrait)} alt={selectedCard.card.name} />
              </div>
              <div className="staff-popover-content">
                <p className="staff-popover-section">{section}</p>
                <p className="staff-popover-variant">{variantLabel}</p>
                <h2 id="staff-popover-title">{selectedCard.card.name}</h2>
                <p className="staff-popover-job">{selectedCard.card.job}</p>
                {selectedCard.card.bio ? <p className="staff-popover-bio">{selectedCard.card.bio}</p> : null}
                <div className="staff-member-tags staff-popover-tags">
                  {selectedCard.card.tags.map((tag) => (
                    <span key={`${selectedCard.card.name}-${tag.text}`} className="staff-tag" data-color={tag.color}>
                      {tag.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
          )
        })()
      ) : null}
    </section>
  )
}

export default StaffPage
