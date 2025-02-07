import { Operation } from "../operation.model";
import { CPU } from "@/cpu/cpu";

export function createRotateShiftOperations(cpu: CPU): Operation[] {
  const rotateShiftOperations: Operation[] = [];
  const { registers } = cpu;

  rotateShiftOperations.push({
    instruction: 'RLCA',
    byteDefinition: 0b00_000_111,
    cycleTime: 1,
    byteLength: 1,
    execute() {
      const bit7 = registers.A.value >> 7;
      registers.flags.CY = bit7;
      registers.flags.H = 0;
      registers.flags.Z = 0;
      registers.flags.N = 0;

      registers.A.value = (registers.A.value << 1) + bit7;
    }
  });

  rotateShiftOperations.push({
    instruction: 'RLA',
    byteDefinition: 0b00_010_111,
    cycleTime: 1,
    byteLength: 1,
    execute() {
      const bit7 = registers.A.value >> 7;
      const result = (registers.A.value << 1) + registers.flags.CY;
      registers.flags.CY = bit7;
      registers.flags.H = 0;
      registers.flags.N = 0;
      registers.flags.Z = 0;

      registers.A.value = result;
    }
  });

  rotateShiftOperations.push({
    instruction: 'RRCA',
    byteDefinition: 0b00_001_111,
    cycleTime: 1,
    byteLength: 1,
    execute() {
      const bit0 = registers.A.value & 0b1;
      registers.flags.CY = bit0;
      registers.flags.H = 0;
      registers.flags.Z = 0;
      registers.flags.N = 0;

      registers.A.value = (registers.A.value >> 1) + (bit0 << 7);
    }
  });

  rotateShiftOperations.push({
    instruction: 'RRA',
    byteDefinition: 0b00_011_111,
    cycleTime: 1,
    byteLength: 1,
    execute() {
      const bit0 = registers.A.value & 0b1;
      const result = (registers.A.value >> 1) + (registers.flags.CY << 7);
      registers.flags.CY = bit0;
      registers.flags.H = 0;
      registers.flags.N = 0;
      registers.flags.Z = 0;

      registers.A.value = result;
    }
  });

  return rotateShiftOperations;
}
