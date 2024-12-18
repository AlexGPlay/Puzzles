package main

import (
	"bufio"
	"fmt"
	"math"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func readFile() [][]string {
	file, err := os.Open("example1.txt")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	var lines [][]string
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		lines = append(lines, strings.Split(scanner.Text(), ""))
	}
	return lines
}

func encodePosition(i int, j int) string {
	return fmt.Sprintf("%d,%d", i, j)
}

func decodePosition(position string) []int {
	numbersAsString := regexp.MustCompile(`\d+`).FindAllString(position, -1)
	var numbers []int
	for _, numberAsString := range numbersAsString {
		number, _ := strconv.Atoi(numberAsString)
		numbers = append(numbers, number)
	}


	return []int{numbers[0], numbers[1]}
}

func cloneVisited(visited map[string]bool) map[string]bool {
	clone := make(map[string]bool)
	for key, value := range visited {
		clone[key] = value
	}
	return clone
}

func findNode(idx int, nodeMap map[string]int) string {
	for key, value := range nodeMap {
		if value == idx {
			return key
		}
	}
	return ""
}

func findDirectionMovement(from []int, to []int) string {
	if from[0] == to[0] {
		return "horizontal"
	}
	return "vertical"
}

type QueueElement struct {
	position []int
	weight int
	from string
	direction string
}

func findNeighbours(lines [][]string, weight int, position []int, direction string) []QueueElement {
	var neighbours []QueueElement

	potentialMovements := [][]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
	for _, movement := range potentialMovements {
		newPosition := []int{position[0] + movement[0], position[1] + movement[1]}
		if newPosition[0] < 0 || newPosition[0] >= len(lines) || newPosition[1] < 0 || newPosition[1] >= len(lines[0]) {
			continue
		}

		if lines[newPosition[0]][newPosition[1]] == "#" {
			continue
		}

		newDirection := "vertical"
		if movement[1] != 0 {
			newDirection = "horizontal"
		}

		movementCost := weight + 1
		if newDirection != direction {
			movementCost += 1000
		}

		neighbours = append(neighbours, QueueElement{newPosition, movementCost, encodePosition(position[0], position[1]) + direction, newDirection})
	}


	return neighbours
}

func sortQueue(queue []QueueElement) []QueueElement {
	for i := 0; i < len(queue); i++ {
		for j := i + 1; j < len(queue); j++ {
			if queue[i].weight > queue[j].weight {
				queue[i], queue[j] = queue[j], queue[i]
			}
		}
	}
	return queue
}

func dijkstra(lines [][]string, from []int, to []int) (int, map[string][]string) {
	queue := []QueueElement{{from, 0, "" , "horizontal"}}
	visited := make(map[string]bool)
	weights := make(map[string]int)
	path := make(map[string][]string)

	for len(queue) > 0 {
		element := queue[0]
		queue = queue[1:]

		key := encodePosition(element.position[0], element.position[1]) + element.direction

		if _, ok := weights[key]; ok {
			if weights[key] < element.weight {
				continue
			} else {
				path[key] = append(path[key], element.from)
				weights[key] = element.weight
			}
		} else {
			path[key] = append(path[key], element.from)
			weights[key] = element.weight
		}

		if visited[key] {
			continue
		}

		visited[key] = true

		neighbours := findNeighbours(lines, weights[key], element.position, element.direction)
		for _, neighbour := range neighbours {
			queue = append(queue, neighbour)
		}
		queue = sortQueue(queue)
	}

	baseKey := encodePosition(to[0], to[1])
	horizontalValue, okHorizontal := weights[baseKey + "horizontal"]
	if !okHorizontal {
		horizontalValue = 1000000
	}

	verticalValue, okVertical := weights[baseKey + "vertical"]
	if !okVertical {
		verticalValue = 1000000
	}

	return int(math.Min(float64(horizontalValue), float64(verticalValue))), path
}

func findElement(lines [][]string, element string) []int {
	for i, line := range lines {
		for j, char := range line {
			if char == element {
				return []int{i, j}
			}
		}
	}
	return []int{}
}

func part1(){
	lines := readFile()
	from := findElement(lines, "S")
	to := findElement(lines, "E")
	weight, _ := dijkstra(lines, from, to)
	fmt.Println(weight)
}

func printPath(path map[string][]string, from string, to string) {
	queue := []string{to}
	uniquePositions := make(map[string]bool)

	for len(queue) > 0 {
		element := queue[0]
		queue = queue[1:]

		elementCoords := decodePosition(element)
		uniquePositions[encodePosition(elementCoords[0], elementCoords[1])] = true

		if element == from {
			break
		}

		for _, parent := range path[element] {
			queue = append(queue, parent)
		}
	}

	fmt.Println(uniquePositions)
}

func part2() {
	lines := readFile()
	from := findElement(lines, "S")
	to := findElement(lines, "E")
	_, path := dijkstra(lines, from, to)
	printPath(path, encodePosition(from[0], from[1]) + "horizontal", encodePosition(to[0], to[1]) + "horizontal")
}

func main(){
	part1()
	part2()
}