extends Node

@export var count = 20
@export var search_radius = 2000
@export var cohesion = true
@export var cohesion_force = 0.5
@export var alignment = true
@export var separation = true
@export var boid_color: Color = Color(0.294, 0.517, 0.66, 1)

var boids = {}
#const PI_3HALF = PI + PI / 4
const PI_3HALF = PI

func _ready():
	print(boid_color)
	var Boid = load("res://boid.tscn")
	print(count, cohesion)
	for i in range(count):
		$Boids.add_child(Boid.instantiate())

	var i = 0
	for b in $Boids.get_children():
		b.get_node("Polygon2D").set_color(boid_color)
		b.id = i
		boids[b.id] = b
		i += 1
	boids[1].get_node("Polygon2D").set_color(Color(1.0, 0.0, 0.0, 1.0))


func find_nearby():
	var adj_list = {}

	for b in boids.values():
		adj_list[b.id] = []
		for b2 in boids.values():
			if b.id == b2.id:
				continue
			# var angle = b.position.angle_to(b2.position)
			# if angle < b.rotation - PI_3HALF or angle > b.rotation + PI_3HALF:
			# 	continue

			if b.position.distance_to(b2.position) < search_radius:
				adj_list[b.id].push_back(b2)

	return adj_list

func do_cohesion(adj_list):
	for id in adj_list.keys():
		var neighbors = adj_list[id]
		var n = len(neighbors)
		if n == 0:
			continue
		var center = Vector2.ZERO
		var target = boids[id]
		for b in neighbors:
			center += b.position
		center /= n
		var angle = target.position.angle_to(center)
		target.rotation += angle * cohesion_force


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(_delta):
	var adj_list = find_nearby()

	if cohesion:
		do_cohesion(adj_list)
