package com.examly.springapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;

@Entity
@Table(name = "employee_skills")
@Data
@AllArgsConstructor
@Builder
public class EmployeeSkill {

    @EmbeddedId
    private EmployeeSkillId id;

    @ManyToOne
    @MapsId("employeeId")
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @ManyToOne
    @MapsId("skillId")
    @JoinColumn(name = "skill_id")
    private Skill skill;

    @Enumerated(EnumType.STRING)
    @Column(name = "proficiency_level", nullable = false)
    private ProficiencyLevel proficiencyLevel;

    public EmployeeSkill() {
    }

    public EmployeeSkillId getId() { return id; }
    public void setId(EmployeeSkillId id) { this.id = id; }

    public Employee getEmployee() { return employee; }
    public void setEmployee(Employee employee) { this.employee = employee; }

    public Skill getSkill() { return skill; }
    public void setSkill(Skill skill) { this.skill = skill; }

    public ProficiencyLevel getProficiencyLevel() { return proficiencyLevel; }
    public void setProficiencyLevel(ProficiencyLevel proficiencyLevel) { this.proficiencyLevel = proficiencyLevel; }

    @Embeddable
    @Data
    public static class EmployeeSkillId implements Serializable {
        @Column(name = "employee_id")
        private Long employeeId;

        @Column(name = "skill_id")
        private Long skillId;

        public EmployeeSkillId() {
        }

        public EmployeeSkillId(Long employeeId, Long skillId) {
            this.employeeId = employeeId;
            this.skillId = skillId;
        }

        public Long getEmployeeId() { return employeeId; }
        public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }

        public Long getSkillId() { return skillId; }
        public void setSkillId(Long skillId) { this.skillId = skillId; }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof EmployeeSkillId)) return false;
            EmployeeSkillId that = (EmployeeSkillId) o;
            return java.util.Objects.equals(employeeId, that.employeeId) &&
                   java.util.Objects.equals(skillId, that.skillId);
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(employeeId, skillId);
        }
    }
}

